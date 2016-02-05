package de.tuebingen.uni.sfs.clarind;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.tools.javac.util.List;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Data
@ToString(exclude = "password")
@Entity
public class WebbaUser {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private
    @Id
    @GeneratedValue
    Long id;
    private String name;
    private
    @JsonIgnore
    String password;

    private String[] roles;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    protected WebbaUser() {
    }

    public WebbaUser(String name, String password, String... roles) {
        this.name = name;
        this.setPassword(password);
        this.roles = roles;
    }
}
