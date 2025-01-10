package deposit.AutoDeposit.Service;
import deposit.AutoDeposit.Entity.Categorie;
import deposit.AutoDeposit.Repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    public List<Categorie> getAllCategorii() {
        return categorieRepository.findAll();
    }

    public Categorie getCategorieById(Short id) {
        return categorieRepository.findById(id).orElse(null);
    }

}
