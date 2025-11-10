package mercuriofx.org.acme.model;

public class Rate {

    private String from;
    private String to;
    private double rate;

    public Rate() {
    }

    public Rate(String from, String to, double rate) {
        this.from = from;
        this.to = to;
        this.rate = rate;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public double getRate() {
        return rate;
    }
}
