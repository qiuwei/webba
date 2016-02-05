package de.tuebingen.uni.sfs.clarind;

import com.google.common.io.ByteStreams;
import com.google.common.io.Files;
import com.mongodb.gridfs.GridFSDBFile;
import de.tuebingen.uni.sfs.clarind.storage.StorageService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Controller
@RequestMapping("/storage")
public class FileUploadController {
    @Autowired
    private StorageService storageService;

    @RequestMapping(value = "/storage", method = RequestMethod.GET)
    public
    @ResponseBody
    String provideUploadInfo() {
        return "You can upload a file by posting to this same URL.";
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public void getById(@PathVariable(value="id") String id, HttpServletResponse response) throws IOException {
        GridFSDBFile file = storageService.get(id);
        if(file!=null) {
            byte[] data = ByteStreams.toByteArray(file.getInputStream());
            response.setContentType(file.getContentType());
            response.setContentLength((int)file.getLength());
            response.getOutputStream().write(data);
            response.getOutputStream().flush();
        } else {
            response.setStatus(HttpStatus.NOT_FOUND.value());
        }

    }

    @RequestMapping(value = "/store", method = RequestMethod.POST)
    public ResponseEntity<String> store(@RequestParam MultipartFile file, WebRequest webRequest) {
        try {
            String storeId = storageService.save(file.getInputStream(), file.getContentType(), file.getOriginalFilename());
            String storedURL = "/storage/id/" + storeId;
            HttpHeaders responseHeaders = new HttpHeaders();
            return new ResponseEntity<String>(storedURL, responseHeaders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
