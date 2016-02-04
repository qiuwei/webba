package de.tuebingen.uni.sfs.clarind;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
public class DatabaseLoader implements CommandLineRunner {
    private final TaskRepository tasks;
    private final WebbaUserRepository users;

    @Autowired
    public DatabaseLoader( TaskRepository tasks, WebbaUserRepository users ) {
        this.tasks = tasks;
        this.users = users;
    }


    @Override
    public void run(String... strings) throws Exception {
        WebbaUser wqiu = this.users.save(new WebbaUser("Wei", "Qiu", "ROLE_USER"));
        WebbaUser alex = this.users.save(new WebbaUser("Alexander", "Chernov", "ROLE_USER"));
        WebbaUser admin = this.users.save(new WebbaUser("Marie", "Hinrichs", "ROLE_ADMIN"));
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("Wei", "Qiu",
                        AuthorityUtils.createAuthorityList("ROLE_USER")));
        this.tasks.save(new Task("/chain.xml", "/karin.txt", "blablabla", "running", wqiu));
        this.tasks.save(new Task("/chain2.xml", "/karin.txt", "blablabla", "failed", wqiu));
        this.tasks.save(new Task("/chain3.xml", "/karin.txt", "blablabla", "succeeded", wqiu));
        this.tasks.save(new Task("/chain4.xml", "/karin.txt", "blablabla", "running", wqiu));
        this.tasks.save(new Task("/chain5.xml", "/karin.txt", "blablabla", "failed", wqiu));
        this.tasks.save(new Task("/chain6.xml", "/karin.txt", "blablabla", "failed", wqiu));
        this.tasks.save(new Task("/chain7.xml", "/karin.txt", "blablabla", "failed", wqiu));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("Alexander", "Chernov",
                        AuthorityUtils.createAuthorityList("ROLE_USER")));
        this.tasks.save(new Task("/chain.xml", "/exampleFood.txt", "blablabla", "running", alex));
        this.tasks.save(new Task("/chain2.xml", "/exampleFood.txt", "blablabla", "failed", alex));
        this.tasks.save(new Task("/chain3.xml", "/exampleFood.txt", "blablabla", "succeeded", alex));
        this.tasks.save(new Task("/chain4.xml", "/exampleFood.txt", "blablabla", "running", alex));
        this.tasks.save(new Task("/chain5.xml", "/exampleFood.txt", "blablabla", "failed", alex));
        this.tasks.save(new Task("/chain6.xml", "/exampleFood.txt", "blablabla", "failed", alex));
        this.tasks.save(new Task("/chain7.xml", "/exampleFood.txt", "blablabla", "failed", alex));
    }

}
