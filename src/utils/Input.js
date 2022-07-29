// All keyboard events
export const Action = {
  Left: "Left",
  Right: "Right",
  Rotate: "Rotate",
  SlowDrop: "SlowDrop",
  FastDrop: "FastDrop",
  Pause: "Pause",
  Quit: "Quit",
};

export const Key = {
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  Space: Action.FastDrop,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
};

export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

export const actionForKey = (keyCode) => Key[keyCode];
