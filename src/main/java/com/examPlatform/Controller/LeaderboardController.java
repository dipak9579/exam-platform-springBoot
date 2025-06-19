package com.examPlatform.Controller;

import com.examPlatform.DTO.LeaderboardEntryDTO;
import com.examPlatform.Services.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")

public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping("/overall")
    public List<LeaderboardEntryDTO> getOverallLeaderboard() {
        return leaderboardService.getOverallLeaderboard();
    }
}
