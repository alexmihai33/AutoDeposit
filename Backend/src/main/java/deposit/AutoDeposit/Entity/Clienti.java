package deposit.AutoDeposit.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tblclienti")
public class Clienti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idclient;

    @Column(nullable = false, length = 255)
    private String nume;

    @Column(nullable = false, length = 255)
    private String nr_tel;

    @Column(nullable = false, length = 255)
    private String mail;

    public enum TipClient {
        firma,
        persoana_fizica
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipClient tip_client;


}
