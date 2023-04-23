interface CommonProps<T extends string, K> {
  onChange: (property: T, value: K) => void;
  values: Record<T, K>;
}

export default CommonProps;
