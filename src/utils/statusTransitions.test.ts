import { describe, expect, it } from 'vitest';
import { getAllowedStatusTransitions } from './statusTransitions';

describe('getAllowedStatusTransitions', () => {
  it('allows an OPEN request to move to IN_PROGRESS or CLOSED', () => {
    expect(getAllowedStatusTransitions('OPEN')).toEqual([
      'IN_PROGRESS',
      'CLOSED',
    ]);
  });

  it('allows an IN_PROGRESS request to move to RESOLVED or OPEN', () => {
    expect(getAllowedStatusTransitions('IN_PROGRESS')).toEqual([
      'RESOLVED',
      'OPEN',
    ]);
  });

  it('allows a RESOLVED request to move to CLOSED or IN_PROGRESS', () => {
    expect(getAllowedStatusTransitions('RESOLVED')).toEqual([
      'CLOSED',
      'IN_PROGRESS',
    ]);
  });

  it('does not allow transitions from CLOSED', () => {
    expect(getAllowedStatusTransitions('CLOSED')).toEqual([]);
  });
});