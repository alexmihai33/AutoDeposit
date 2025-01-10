package deposit.AutoDeposit.Repository;

import deposit.AutoDeposit.Entity.Comanda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComandaRepository extends JpaRepository<Comanda, Long> {
}