package deposit.AutoDeposit.Service;

import deposit.AutoDeposit.Entity.Furnizor;
import deposit.AutoDeposit.Repository.FurnizorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FurnizorService {

    @Autowired
    private FurnizorRepository furnizorRepository;

    public List<Furnizor> getAllFurnizori() {
        return furnizorRepository.findAll();
    }

    public Furnizor getFurnizorById(Short id) {
        return furnizorRepository.findById(id).orElse(null);
    }

    // Add more service methods if necessary
}
