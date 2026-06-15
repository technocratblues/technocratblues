// ── useFormThrottle ───────────────────────────────────────────────────────────


//  Client-side rate-limit guard for the contact form.
//  Uses localStorage so limits reset when the tab/browser is closed.

const STORAGE_KEY  = 'tc_form_submissions';
const COOLDOWN_MS  = 60 * 1000;   // 60 seconds between submissions
const MAX_PER_SESSION = 3;         // hard cap per browser session


function checkThrottle() {
  let record;
  try {
    record = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    record = null;
  }

  if (!record) return { allowed: true, reason: null, secondsLeft: 0 };

  const { count = 0, lastAt = 0 } = record;
  const now         = Date.now();
  const elapsed     = now - lastAt;
  const secondsLeft = Math.max(0, Math.ceil((COOLDOWN_MS - elapsed) / 1000));

  if (count >= MAX_PER_SESSION) {
    return {
      allowed: false,
      reason:  `You've reached the maximum of ${MAX_PER_SESSION} submissions per session. Please refresh or contact us directly.`,
      secondsLeft: 0,
    };
  }

  if (elapsed < COOLDOWN_MS) {
    return {
      allowed: false,
      reason:  `Please wait ${secondsLeft}s before submitting again.`,
      secondsLeft,
    };
  }

  return { allowed: true, reason: null, secondsLeft: 0 };
}

function recordSubmission() {
  let record;
  try {
    record = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    record = null;
  }

  const updated = {
    count: (record?.count || 0) + 1,
    lastAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// ── React hook ────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';

export function useFormThrottle() {
  const [throttleState, setThrottleState] = useState(() => checkThrottle());

  // Tick every second to update the countdown display
  useEffect(() => {
    if (throttleState.secondsLeft <= 0) return;
    const id = setInterval(() => {
      const next = checkThrottle();
      setThrottleState(next);
      if (next.secondsLeft <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [throttleState.secondsLeft]);

  const markSubmitted = useCallback(() => {
    recordSubmission();
    setThrottleState(checkThrottle());
  }, []);

  return {
    isThrottled:   !throttleState.allowed,
    throttleReason: throttleState.reason,
    secondsLeft:   throttleState.secondsLeft,
    markSubmitted,
  };
}