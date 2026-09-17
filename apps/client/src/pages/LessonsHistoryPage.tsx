import LessonsHistoryDisplay from "../components/LessonsHistoryDisplay";

type LessonsHistoryProps = {
  setError: (message: string) => void;
};

export default function LessonsHistory({ setError }: LessonsHistoryProps) {
  return <LessonsHistoryDisplay setError={setError} />;
}
