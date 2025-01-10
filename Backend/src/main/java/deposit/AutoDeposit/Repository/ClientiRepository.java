package deposit.AutoDeposit.Repository;

import deposit.AutoDeposit.Entity.Clienti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientiRepository extends JpaRepository<Clienti, Integer> {
    // You can define custom queries here if needed.
}
