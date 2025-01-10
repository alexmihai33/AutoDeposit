package deposit.AutoDeposit.Controller;

import deposit.AutoDeposit.Entity.Clienti;
import deposit.AutoDeposit.Entity.Clienti;
import deposit.AutoDeposit.Service.ClientiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clienti")
@CrossOrigin(origins = "*")
public class ClientiController {

    @Autowired
    private ClientiService clientService;

    @GetMapping
    public List<Clienti> getAllClienti() {
        return clientService.getAllClienti();
    }

    @PostMapping
    public ResponseEntity<Clienti> createClient(@RequestBody Clienti Clienti) {
        Clienti savedClient = clientService.createClient(Clienti);
        return ResponseEntity.ok(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clienti> updateClient(@PathVariable Integer id, @RequestBody Clienti Clienti) {
        Clienti updatedClient = clientService.updateClient(id, Clienti);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
