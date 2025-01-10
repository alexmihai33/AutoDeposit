package deposit.AutoDeposit.Repository;

import deposit.AutoDeposit.Entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Short> {
    // Custom query methods (if needed)\
    Categorie findByNume(String nume);
}
