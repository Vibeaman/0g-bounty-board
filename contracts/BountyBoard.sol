// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BountyBoard
 * @notice Decentralized bounty marketplace for AI agents
 * @dev Integrates with 0G Storage for off-chain data and 0G Compute for AI inference
 */
contract BountyBoard {
    // ============ Enums ============
    
    enum BountyStatus { 
        Open,           // Accepting claims
        InProgress,     // Claimed, work in progress
        UnderReview,    // Submission received, awaiting approval
        Completed,      // Approved and paid
        Cancelled,      // Cancelled by poster
        Expired         // Deadline passed without completion
    }
    
    enum BountyType {
        TextGeneration,     // Writing, summaries, etc.
        ImageGeneration,    // AI art, logos, designs
        Transcription,      // Audio to text
        CodeReview,         // Code analysis, bug finding
        Translation,        // Language translation
        DataAnalysis,       // Process and analyze data
        Other               // Catch-all category
    }

    // ============ Structs ============
    
    struct Bounty {
        uint256 id;
        address poster;
        uint256 reward;
        bytes32 detailsHash;        // 0G Storage root hash for full details
        uint256 deadline;
        uint256 createdAt;
        BountyStatus status;
        BountyType bountyType;
        address claimedBy;
        uint256 claimedAt;
    }
    
    struct Submission {
        uint256 id;
        uint256 bountyId;
        address agent;
        bytes32 workHash;           // 0G Storage root hash for submission
        uint256 submittedAt;
        bool approved;
        bool rejected;
        string rejectionReason;
    }

    // ============ State Variables ============
    
    uint256 public bountyCounter;
    uint256 public submissionCounter;
    uint256 public platformFee = 200;   // 2% (basis points)
    address public owner;
    
    mapping(uint256 => Bounty) public bounties;
    mapping(uint256 => Submission[]) public bountySubmissions;
    mapping(address => uint256[]) public posterBounties;
    mapping(address => uint256[]) public agentSubmissions;
    
    // ============ Events ============
    
    event BountyCreated(
        uint256 indexed bountyId,
        address indexed poster,
        uint256 reward,
        bytes32 detailsHash,
        BountyType bountyType,
        uint256 deadline
    );
    
    event BountyClaimed(
        uint256 indexed bountyId,
        address indexed agent,
        uint256 claimedAt
    );
    
    event WorkSubmitted(
        uint256 indexed bountyId,
        uint256 indexed submissionId,
        address indexed agent,
        bytes32 workHash
    );
    
    event SubmissionApproved(
        uint256 indexed bountyId,
        uint256 indexed submissionId,
        address indexed agent,
        uint256 payout
    );
    
    event SubmissionRejected(
        uint256 indexed bountyId,
        uint256 indexed submissionId,
        string reason
    );
    
    event BountyCancelled(uint256 indexed bountyId);
    event BountyExpired(uint256 indexed bountyId);
    event FundsWithdrawn(uint256 indexed bountyId, address indexed poster, uint256 amount);

    // ============ Modifiers ============
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyPoster(uint256 bountyId) {
        require(bounties[bountyId].poster == msg.sender, "Not bounty poster");
        _;
    }
    
    modifier bountyExists(uint256 bountyId) {
        require(bountyId > 0 && bountyId <= bountyCounter, "Bounty does not exist");
        _;
    }

    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
    }

    // ============ Core Functions ============
    
    /**
     * @notice Create a new bounty
     * @param detailsHash 0G Storage root hash containing bounty details
     * @param deadline Unix timestamp for submission deadline
     * @param bountyType Type of task (text, image, transcription, etc.)
     */
    function createBounty(
        bytes32 detailsHash,
        uint256 deadline,
        BountyType bountyType
    ) external payable returns (uint256) {
        require(msg.value > 0, "Reward must be greater than 0");
        require(deadline > block.timestamp, "Deadline must be in future");
        require(detailsHash != bytes32(0), "Details hash required");
        
        bountyCounter++;
        uint256 bountyId = bountyCounter;
        
        bounties[bountyId] = Bounty({
            id: bountyId,
            poster: msg.sender,
            reward: msg.value,
            detailsHash: detailsHash,
            deadline: deadline,
            createdAt: block.timestamp,
            status: BountyStatus.Open,
            bountyType: bountyType,
            claimedBy: address(0),
            claimedAt: 0
        });
        
        posterBounties[msg.sender].push(bountyId);
        
        emit BountyCreated(
            bountyId,
            msg.sender,
            msg.value,
            detailsHash,
            bountyType,
            deadline
        );
        
        return bountyId;
    }
    
    /**
     * @notice Claim a bounty to work on it
     * @param bountyId ID of the bounty to claim
     */
    function claimBounty(uint256 bountyId) external bountyExists(bountyId) {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.status == BountyStatus.Open, "Bounty not open");
        require(block.timestamp < bounty.deadline, "Bounty expired");
        require(bounty.poster != msg.sender, "Cannot claim own bounty");
        
        bounty.status = BountyStatus.InProgress;
        bounty.claimedBy = msg.sender;
        bounty.claimedAt = block.timestamp;
        
        emit BountyClaimed(bountyId, msg.sender, block.timestamp);
    }
    
    /**
     * @notice Submit work for a claimed bounty
     * @param bountyId ID of the bounty
     * @param workHash 0G Storage root hash containing the submission
     */
    function submitWork(
        uint256 bountyId,
        bytes32 workHash
    ) external bountyExists(bountyId) returns (uint256) {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.status == BountyStatus.InProgress, "Bounty not in progress");
        require(bounty.claimedBy == msg.sender, "Not the claimer");
        require(block.timestamp <= bounty.deadline, "Deadline passed");
        require(workHash != bytes32(0), "Work hash required");
        
        submissionCounter++;
        uint256 submissionId = submissionCounter;
        
        Submission memory submission = Submission({
            id: submissionId,
            bountyId: bountyId,
            agent: msg.sender,
            workHash: workHash,
            submittedAt: block.timestamp,
            approved: false,
            rejected: false,
            rejectionReason: ""
        });
        
        bountySubmissions[bountyId].push(submission);
        agentSubmissions[msg.sender].push(submissionId);
        
        bounty.status = BountyStatus.UnderReview;
        
        emit WorkSubmitted(bountyId, submissionId, msg.sender, workHash);
        
        return submissionId;
    }
    
    /**
     * @notice Approve a submission and release payment
     * @param bountyId ID of the bounty
     * @param submissionIndex Index of the submission in the bounty's submissions array
     */
    function approveSubmission(
        uint256 bountyId,
        uint256 submissionIndex
    ) external bountyExists(bountyId) onlyPoster(bountyId) {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.status == BountyStatus.UnderReview, "Not under review");
        require(submissionIndex < bountySubmissions[bountyId].length, "Invalid submission");
        
        Submission storage submission = bountySubmissions[bountyId][submissionIndex];
        require(!submission.approved && !submission.rejected, "Already processed");
        
        submission.approved = true;
        bounty.status = BountyStatus.Completed;
        
        // Calculate payout
        uint256 fee = (bounty.reward * platformFee) / 10000;
        uint256 payout = bounty.reward - fee;
        
        // Transfer to agent
        (bool success, ) = payable(submission.agent).call{value: payout}("");
        require(success, "Transfer failed");
        
        emit SubmissionApproved(bountyId, submission.id, submission.agent, payout);
    }
    
    /**
     * @notice Reject a submission with reason
     * @param bountyId ID of the bounty
     * @param submissionIndex Index of the submission
     * @param reason Reason for rejection
     */
    function rejectSubmission(
        uint256 bountyId,
        uint256 submissionIndex,
        string calldata reason
    ) external bountyExists(bountyId) onlyPoster(bountyId) {
        Bounty storage bounty = bounties[bountyId];
        
        require(bounty.status == BountyStatus.UnderReview, "Not under review");
        require(submissionIndex < bountySubmissions[bountyId].length, "Invalid submission");
        
        Submission storage submission = bountySubmissions[bountyId][submissionIndex];
        require(!submission.approved && !submission.rejected, "Already processed");
        
        submission.rejected = true;
        submission.rejectionReason = reason;
        
        // Reset to InProgress so agent can resubmit
        bounty.status = BountyStatus.InProgress;
        
        emit SubmissionRejected(bountyId, submission.id, reason);
    }
    
    /**
     * @notice Cancel a bounty (only if not claimed or expired)
     * @param bountyId ID of the bounty to cancel
     */
    function cancelBounty(uint256 bountyId) 
        external 
        bountyExists(bountyId) 
        onlyPoster(bountyId) 
    {
        Bounty storage bounty = bounties[bountyId];
        
        require(
            bounty.status == BountyStatus.Open || 
            block.timestamp > bounty.deadline,
            "Cannot cancel active bounty"
        );
        
        bounty.status = BountyStatus.Cancelled;
        
        // Refund poster
        (bool success, ) = payable(bounty.poster).call{value: bounty.reward}("");
        require(success, "Refund failed");
        
        emit BountyCancelled(bountyId);
    }
    
    /**
     * @notice Withdraw funds from expired bounty
     * @param bountyId ID of the expired bounty
     */
    function withdrawExpired(uint256 bountyId) 
        external 
        bountyExists(bountyId) 
        onlyPoster(bountyId) 
    {
        Bounty storage bounty = bounties[bountyId];
        
        require(block.timestamp > bounty.deadline, "Bounty not expired");
        require(
            bounty.status != BountyStatus.Completed && 
            bounty.status != BountyStatus.Cancelled,
            "Already settled"
        );
        
        bounty.status = BountyStatus.Expired;
        
        (bool success, ) = payable(bounty.poster).call{value: bounty.reward}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(bountyId, bounty.poster, bounty.reward);
    }

    // ============ View Functions ============
    
    function getBounty(uint256 bountyId) external view returns (Bounty memory) {
        return bounties[bountyId];
    }
    
    function getSubmissions(uint256 bountyId) external view returns (Submission[] memory) {
        return bountySubmissions[bountyId];
    }
    
    function getPosterBounties(address poster) external view returns (uint256[] memory) {
        return posterBounties[poster];
    }
    
    function getAgentSubmissions(address agent) external view returns (uint256[] memory) {
        return agentSubmissions[agent];
    }
    
    function getOpenBounties(uint256 limit, uint256 offset) external view returns (Bounty[] memory) {
        uint256 count = 0;
        
        // First pass: count open bounties
        for (uint256 i = 1; i <= bountyCounter; i++) {
            if (bounties[i].status == BountyStatus.Open && block.timestamp < bounties[i].deadline) {
                count++;
            }
        }
        
        // Adjust for pagination
        if (offset >= count) {
            return new Bounty[](0);
        }
        
        uint256 resultCount = count - offset;
        if (resultCount > limit) {
            resultCount = limit;
        }
        
        Bounty[] memory result = new Bounty[](resultCount);
        uint256 resultIndex = 0;
        uint256 skipped = 0;
        
        for (uint256 i = 1; i <= bountyCounter && resultIndex < resultCount; i++) {
            if (bounties[i].status == BountyStatus.Open && block.timestamp < bounties[i].deadline) {
                if (skipped < offset) {
                    skipped++;
                } else {
                    result[resultIndex] = bounties[i];
                    resultIndex++;
                }
            }
        }
        
        return result;
    }

    // ============ Admin Functions ============
    
    function setFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
