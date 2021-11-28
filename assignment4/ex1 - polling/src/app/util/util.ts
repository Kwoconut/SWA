import { Warning } from "../warnings/model/warning";

export function warningsArraysEqualById(a : Warning[], b: Warning[]) {
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i].id !== b[i].id) return false;
    }
    return true;
  }