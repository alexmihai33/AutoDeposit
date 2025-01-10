package deposit.AutoDeposit.Controller;

import deposit.AutoDeposit.Entity.Furnizor;
import deposit.AutoDeposit.Service.FurnizorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FurnizorController {

    @Autowired
    private FurnizorService furnizorService;

    @GetMapping("/api/furnizori")
    public List<Furnizor> getAllFurnizori() {
        return furnizorService.getAllFurnizori();
    }
}
