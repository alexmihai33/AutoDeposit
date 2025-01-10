package deposit.AutoDeposit.Controller;

import deposit.AutoDeposit.DTO.PieseDTO;
import deposit.AutoDeposit.Service.PieseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/piese")
@CrossOrigin(origins = "*")
public class PieseController {

    @Autowired
    private PieseService piesaService;

    @GetMapping
    public List<PieseDTO> getAllPiese() {
        return piesaService.getAllPiese();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PieseDTO> getPieseById(@PathVariable Short id) {
        return piesaService.getPieseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PieseDTO> createPiesa(@RequestBody PieseDTO piesaDTO) {
        PieseDTO savedPiesa = piesaService.mapToDTO(piesaService.createPiese(piesaDTO));
        return ResponseEntity.ok(savedPiesa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PieseDTO> updatePiesa(@PathVariable Short id, @RequestBody PieseDTO piesaDTO) {
        PieseDTO updatedPiesa = piesaService.mapToDTO(piesaService.updatePiese(id, piesaDTO));
        return ResponseEntity.ok(updatedPiesa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePiesa(@PathVariable Short id) {
        piesaService.deletePiese(id);
        return ResponseEntity.noContent().build();
    }
}
