package deposit.AutoDeposit.Service;

import deposit.AutoDeposit.Entity.Comanda;
import deposit.AutoDeposit.Repository.ComandaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ComandaService {

    @Autowired
    private ComandaRepository comandaRepository;

    public List<Comanda> getAllComenzi() {
        return comandaRepository.findAll();
    }

    public Comanda createComanda(Comanda comanda) {
        return comandaRepository.save(comanda);
    }
}