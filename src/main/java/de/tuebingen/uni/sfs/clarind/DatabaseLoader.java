package de.tuebingen.uni.sfs.clarind;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
public class DatabaseLoader implements CommandLineRunner {
    private final TaskRepository repository;

    @Autowired
    public DatabaseLoader( TaskRepository repository) {
        this.repository = repository;
    }


    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Task("/chain.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain2.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain3.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain4.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain5.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain6.xml", "/karin.txt", "blablabla"));
        this.repository.save(new Task("/chain7.xml", "/karin.txt", "blablabla"));
    }

}
