import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 * Created by ader_metria.se on 2017-03-11.
 */


public class SvampKartanApplication extends Application<SvampKartanConfiguration> {
    public static void main(String[] args) throws Exception {
        new SvampKartanApplication().run(args);
    }

    @Override
    public String getName() {
        return "hello-world";
    }

    @Override
    public void initialize(Bootstrap<SvampKartanConfiguration> bootstrap) {
        AssetsBundle asb = new AssetsBundle("/assets","/web");
        bootstrap.addBundle(asb);
        System.out.println("Bundles added!");
    }

    @Override
    public void run(SvampKartanConfiguration configuration,
                    Environment environment) {
        // nothing to do yet
    }

}