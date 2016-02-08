package de.tuebingen.uni.sfs.clarind;

import lombok.Data;
import org.bson.types.ObjectId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Data
@Entity
public class WebbaFile {

    //objectId in gridFs
    @Id
    private ObjectId objectId;

    private
    @ManyToOne
    WebbaUser webbaUser;

    private WebbaFile() {
    }

    public WebbaFile(ObjectId objectId, WebbaUser webbaUser) {
        this.webbaUser = webbaUser;
    }

}
