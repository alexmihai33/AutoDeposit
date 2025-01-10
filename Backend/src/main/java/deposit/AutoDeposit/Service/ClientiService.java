package deposit.AutoDeposit.Service;

import deposit.AutoDeposit.Entity.Clienti;
import deposit.AutoDeposit.Repository.ClientiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientiService {

    @Autowired
    private ClientiRepository clientRepository;

    public List<Clienti> getAllClienti() {
        return clientRepository.findAll();
    }

    public Optional<Clienti> getClientById(Integer id) {
        return clientRepository.findById(id);
    }

    public Clienti createClient(Clienti clientModel) {
        System.out.println("Client tip_client: " + clientModel.getTip_client());  // Debugging
        return clientRepository.save(clientModel);
    }

    public Clienti updateClient(Integer id, Clienti clientModel) {
        if (clientRepository.existsById(id)) {
            clientModel.setIdclient(id);
            return clientRepository.save(clientModel);
        }
        throw new RuntimeException("Client not found");
    }

    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }
}
