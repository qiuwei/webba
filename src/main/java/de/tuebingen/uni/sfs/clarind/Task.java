package de.tuebingen.uni.sfs.clarind;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

/**
 * @author Wei Qiu <wei@qiu.es>
 */

@Data
@Entity
public class Task {

    private
    @Id
    @GeneratedValue
    Long id;

    private String chainFilePath;
    private String fileToProcessPath;
    private String description;
    private String status;

    private
    @Version
    @JsonIgnore
    Long version;

    private
    @ManyToOne
    WebbaUser webbaUser;

    private Task() {
    }

    public Task(String chainFilePath, String fileToProcessPath, String description, String status, WebbaUser
            webbaUser) {
        this.chainFilePath = chainFilePath;
        this.fileToProcessPath = fileToProcessPath;
        this.description = description;
        this.status = status;
        this.webbaUser = webbaUser;
    }
}
