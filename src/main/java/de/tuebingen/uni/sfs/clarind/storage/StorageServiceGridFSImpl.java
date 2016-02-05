package de.tuebingen.uni.sfs.clarind.storage;

import com.mongodb.DB;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.stereotype.Component;

import java.io.InputStream;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
public class StorageServiceGridFSImpl implements StorageService{
    private final GridFS gridFS;
    private final MongoDbFactory mongoDbFactory;

    @Autowired
    public StorageServiceGridFSImpl(MongoDbFactory mongoDbFactory) {
        this.mongoDbFactory = mongoDbFactory;
        this.gridFS = new GridFS(mongoDbFactory.getDb());
    }

    @Override
    public String save(InputStream inputStream, String contentType, String filename) {
        GridFSInputFile input = gridFS.createFile(inputStream);
        input.setContentType(contentType);
        input.setFilename(filename);
        input.save();
        return input.getId().toString();
    }

    @Override
    public GridFSDBFile get(String id) {
        return gridFS.findOne(new ObjectId(id));
    }
}
