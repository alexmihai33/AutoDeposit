package deposit.AutoDeposit.Repository;

import deposit.AutoDeposit.Entity.PieseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PieseRepository extends JpaRepository<PieseModel, Short> {
}
