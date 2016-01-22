package de.tuebingen.uni.sfs.clarind;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {
}
