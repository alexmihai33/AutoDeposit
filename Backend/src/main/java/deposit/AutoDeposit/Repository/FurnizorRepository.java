package deposit.AutoDeposit.Repository;
import deposit.AutoDeposit.Entity.Furnizor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FurnizorRepository extends JpaRepository<Furnizor, Short> {
    // Custom query methods (if needed)
    Furnizor findByNume(String nume);
}

