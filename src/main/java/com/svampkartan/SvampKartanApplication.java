package com.svampkartan;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class SvampKartanApplication extends Application<SvampKartanConfiguration> {

    public static void main(final String[] args) throws Exception {
        new SvampKartanApplication().run(args);
    }

    @Override
    public String getName() {
        return "SvampKartan";
    }

    @Override
    public void initialize(final Bootstrap<SvampKartanConfiguration> bootstrap) {
        // TODO: application initialization
    }

    @Override
    public void run(final SvampKartanConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
    }

}
