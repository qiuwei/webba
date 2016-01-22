package de.tuebingen.uni.sfs.clarind;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Wei Qiu <wei@qiu.es>
 */

@Data
@Entity
public class Task {

    private @Id
    @GeneratedValue Long id;

    private String chainFilePath;
    private String fileToProcessPath;
    private String description;
    private String status;

    private Task() {};

    public Task(String chainFilePath, String fileToProcessPath, String description, String status) {
        this.chainFilePath = chainFilePath;
        this.fileToProcessPath = fileToProcessPath;
        this.description = description;
        this.status = status;
    }
}
