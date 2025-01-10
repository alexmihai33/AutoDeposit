package deposit.AutoDeposit.Service;

import deposit.AutoDeposit.DTO.PieseDTO;
import deposit.AutoDeposit.Entity.Categorie;
import deposit.AutoDeposit.Entity.Furnizor;
import deposit.AutoDeposit.Entity.PieseModel;
import deposit.AutoDeposit.Repository.CategorieRepository;
import deposit.AutoDeposit.Repository.FurnizorRepository;
import deposit.AutoDeposit.Repository.PieseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PieseService {

    @Autowired
    private PieseRepository pieseRepository;

    @Autowired
    private FurnizorRepository furnizorRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    // Get all Piese as DTOs
    public List<PieseDTO> getAllPiese() {
        List<PieseModel> piese = pieseRepository.findAll();
        return piese.stream()
                .map(PieseDTO::new) // Convert PieseModel to PieseDTO using the new constructor
                .collect(Collectors.toList());
    }

    public Optional<PieseDTO> getPieseById(Short id) {
        return pieseRepository.findById(id).map(this::mapToDTO);
    }

    public PieseModel createPiese(PieseDTO pieseDTO) {
        return pieseRepository.save(mapToEntity(pieseDTO));
    }

    public PieseModel updatePiese(Short id, PieseDTO pieseDTO) {
        PieseModel existingPiesa = pieseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PieseModel not found with id: " + id));
        existingPiesa.setNume(pieseDTO.getNume());
        existingPiesa.setPret(pieseDTO.getPret());
        existingPiesa.setAn_fabricatie(pieseDTO.getAn_fabricatie());

        // Update relationships
        Furnizor furnizor = furnizorRepository.findById(pieseDTO.getIdfurnizor())
                .orElseThrow(() -> new RuntimeException("Furnizor not found with id: " + pieseDTO.getIdfurnizor()));
        existingPiesa.setFurnizor(furnizor);

        Categorie categorie = categorieRepository.findById(pieseDTO.getIdcategorie())
                .orElseThrow(() -> new RuntimeException("Categorie not found with id: " + pieseDTO.getIdcategorie()));
        existingPiesa.setCategorie(categorie);

        return pieseRepository.save(existingPiesa);
    }

    public void deletePiese(Short id) {
        PieseModel piesa = pieseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PieseModel not found with id: " + id));
        pieseRepository.delete(piesa);
    }

    // Helper: Map PieseModel to PieseDTO
    public PieseDTO mapToDTO(PieseModel piesa) {
        return new PieseDTO(
                piesa.getIdpiesa(),
                piesa.getFurnizor().getIdfurnizor(),
                piesa.getCategorie().getIdcategorie(),
                piesa.getNume(),
                piesa.getPret(),
                piesa.getAn_fabricatie(),
                piesa.getFurnizor().getNume(),
                piesa.getCategorie().getNume()
        );
    }

    private PieseModel mapToEntity(PieseDTO pieseDTO) {
        Furnizor furnizor = furnizorRepository.findById(pieseDTO.getIdfurnizor())
                .orElseThrow(() -> new RuntimeException("Furnizor not found with id: " + pieseDTO.getIdfurnizor()));

        Categorie categorie = categorieRepository.findById(pieseDTO.getIdcategorie())
                .orElseThrow(() -> new RuntimeException("Categorie not found with id: " + pieseDTO.getIdcategorie()));

        return new PieseModel(
                pieseDTO.getIdpiesa(),
                furnizor,
                categorie,
                pieseDTO.getNume(),
                pieseDTO.getPret(),
                pieseDTO.getAn_fabricatie()
        );
    }
}
