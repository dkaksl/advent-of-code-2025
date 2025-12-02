public class Dial {
    private int number;
    private int zeroCount = 0;

    public Dial(int number) {
        this.number = number;
    }

    public void incrementDial(int steps) {
        for (int i = 0; i < steps; i++) {
            incrementDialOnce();
        }
        System.out.printf("dial rotated R%s to point at %s%n", steps, number);
        if (number == 0) {
            this.zeroCount++;
        }
    }

    private void incrementDialOnce() {
        if (number == 99) {
            number = 0;
            return;
        }
        number++;
    }

    public void decrementDial(int steps) {
        for (int i = 0; i < steps; i++) {
            decrementDialOnce();
        }
        System.out.printf("dial rotated L%s to point at %s%n", steps, number);
        if (number == 0) {
            this.zeroCount++;
        }
    }

    private void decrementDialOnce() {
        if (number == 0) {
            number = 99;
            return;
        }
        number--;
    }

    public int getZeroCount() {
        return zeroCount;
    }
}
