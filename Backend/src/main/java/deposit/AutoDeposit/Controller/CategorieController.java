package deposit.AutoDeposit.Controller;

import deposit.AutoDeposit.Entity.Categorie;
import deposit.AutoDeposit.Service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping("/api/categorii")
    public List<Categorie> getAllCategorii() {
        return categorieService.getAllCategorii();
    }
}
