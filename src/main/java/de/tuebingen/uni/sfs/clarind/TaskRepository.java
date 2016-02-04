package de.tuebingen.uni.sfs.clarind;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@PreAuthorize("hasRole('ROLE_USER')")
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
    @Override
    @PreAuthorize("#task?.webbaUser == null or #task?.webbaUser?.name == authentication?.name")
    Task save(@Param("task") Task task);

    @Override
    @PreAuthorize("@taskRepository.findOne(#id)?.webbaUser?.name == authentication?.name")
    void delete(@Param("id") Long id);

    @Override
    @PreAuthorize("#task?.webbaUser?.name == authentication?.name")
    void delete(@Param("task") Task task);

    @Override
    @PostFilter("hasRole(Role_ADMIN) or filterObject?.webbaUser?.name == authentication?.name")
    Iterable<Task> findAll();

}
