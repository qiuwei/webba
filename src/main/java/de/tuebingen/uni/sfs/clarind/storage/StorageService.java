package de.tuebingen.uni.sfs.clarind.storage;

import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.stereotype.Component;

import java.io.InputStream;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
public interface StorageService {
    String save(InputStream inputStream, String contentType, String filename);

    GridFSDBFile get(String id);

}
