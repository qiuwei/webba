package de.tuebingen.uni.sfs.clarind;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WebbaApplication.class)
@WebAppConfiguration
public class WebbaApplicationTests {
    public static final String storedTestFile = "/storage/id/56b896df370882b4e2600ea1";

    @Test
    public void contextLoads() {
    }

}
