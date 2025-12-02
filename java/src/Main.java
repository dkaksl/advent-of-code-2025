import java.io.File;
import java.util.Scanner;

import static java.lang.Integer.parseInt;

public class Main {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            throw new Exception("unexpected number of args");
        }

        String day = args[0];
        String part = args[1];

        System.out.printf("solving day %s part %s challenge%n", day, part);
        System.out.printf("current dir %s%n", System.getProperty("user.dir"));
        
        Dial dial = new Dial(50);

        File input = new File(String.format("inputs/day%s.txt", day));
        try (Scanner inputReader = new Scanner(input)) {
            while (inputReader.hasNextLine()) {
                String row = inputReader.nextLine();
                String direction = row.substring(0, 1);
                int stepCount = parseInt(row.substring(1));
                if (direction.equals("L")) {
                    dial.decrementDial(stepCount);
                } else {
                    dial.incrementDial(stepCount);
                }
            }
        }

        System.out.printf("got zero count %s", dial.getZeroCount());

    }
}
