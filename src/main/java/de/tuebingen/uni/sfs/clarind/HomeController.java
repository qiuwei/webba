package de.tuebingen.uni.sfs.clarind;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Wei Qiu <wei@qiu.es>
 */
@Controller
public class HomeController {
    @RequestMapping(value="/")
    public String index() {
        return "index";
    }
}
