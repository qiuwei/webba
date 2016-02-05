package de.tuebingen.uni.sfs.clarind;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
@RepositoryEventHandler(Task.class)
public class SpringDataRestEventHandler {
    private final WebbaUserRepository webbaUserRepository;

    @Autowired
    public SpringDataRestEventHandler(WebbaUserRepository webbaUserRepository) {
        this.webbaUserRepository = webbaUserRepository;
    }

    @HandleBeforeCreate
    public void applyUserInfomationUsingSecurityContext(Task task) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        WebbaUser user = this.webbaUserRepository.findByName(name);
        if (user == null) {
            WebbaUser newWebbaUser = new WebbaUser();
            newWebbaUser.setName(name);
            newWebbaUser.setRoles(new String[]{"ROLE_USER"});
            user = this.webbaUserRepository.save(newWebbaUser);
        }
        task.setWebbaUser(user);
    }

}
