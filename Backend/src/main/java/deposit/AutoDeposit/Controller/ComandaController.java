package deposit.AutoDeposit.Controller;

import deposit.AutoDeposit.Entity.Comanda;
import deposit.AutoDeposit.Service.ComandaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comenzi")
@CrossOrigin(origins = "*")
public class ComandaController {

    @Autowired
    private ComandaService comandaService;

    // Get all comenzi
    @GetMapping
    public List<Comanda> getAllComenzi() {
        return comandaService.getAllComenzi();
    }

    @PostMapping
    public Comanda createComanda(@RequestBody Comanda comanda) {
        return comandaService.createComanda(comanda);
    }
}