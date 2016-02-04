package de.tuebingen.uni.sfs.clarind;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@RepositoryRestResource(exported = false)
public interface WebbaUserRepository extends Repository<WebbaUser, Long> {
    WebbaUser save(WebbaUser webbaUser);

    WebbaUser findByName(String name);
}
