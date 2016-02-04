package de.tuebingen.uni.sfs.clarind;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {
    private final WebbaUserRepository repository;

    @Autowired
    public SpringDataJpaUserDetailsService(WebbaUserRepository repository) {
        this.repository = repository;
    }

    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        WebbaUser webbaUser = this.repository.findByName(name);
        return new org.springframework.security.core.userdetails.User(webbaUser.getName(), webbaUser.getPassword(), AuthorityUtils.createAuthorityList(webbaUser.getRoles()));
    }
}
