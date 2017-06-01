import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Range, Position, offsetToPosition, locToRange} from '../Range';

const text = `query test {
  name
}`;
const absRange = {start: 15, end: 18};//position of 'name' attribute in the test query
const offsetRangeStart = new Position(1, 2);
const offsetRangeEnd = new Position(1, 5);

describe('class Position', () => {
  it('constructs Position object', () => {
    const pos = new Position(3, 5);
    expect(pos).to.not.be.undefined;
    expect(pos.character).to.equal(5);
    expect(pos.line).to.equal(3);
  });

  it('compares Position object', () => {
    const pos_1 = new Position(1, 2);
    const pos_2 = new Position(2, 2);
    const pos_3 = new Position(2, 3);
    expect(pos_1.lessThanOrEqualTo(pos_2)).to.equal(true);
    expect(pos_2.lessThanOrEqualTo(pos_3)).to.equal(true);
    expect(pos_3.lessThanOrEqualTo(pos_1)).to.equal(false);
  });
});

describe('class Range', () => {
  const start = new Position(2, 3);
  const end = new Position(2, 5);
  const range = new Range(start, end);

  it('constructs Range object', () => {
    expect(range).to.not.be.undefined;
    expect(range.start).to.deep.equal(start);
    expect(range.end).to.deep.equal(end);
  });

  it('checks if it contains centain position', () => {
    const pos_1 = new Position(2, 4);
    const pos_2 = new Position(3, 5);
    expect(range.containsPosition(pos_1)).to.equal(true);
    expect(range.containsPosition(pos_2)).to.equal(false);
  });
});

describe('offsetToPosition', () => {
  it('gets offset to position', () => {
    expect(offsetToPosition(text, absRange.start).character).to.equal(offsetRangeStart.character);
    expect(offsetToPosition(text, absRange.start).line).to.equal(offsetRangeStart.line);
  });
});

describe('locToRange', () => {
  it('gets location to range', () => {
    expect(locToRange(text, absRange).start.character).to.equal(offsetRangeStart.character);
    expect(locToRange(text, absRange).start.line).to.equal(offsetRangeStart.line);
    expect(locToRange(text, absRange).end.character).to.equal(offsetRangeEnd.character);
    expect(locToRange(text, absRange).end.line).to.equal(offsetRangeEnd.line);
  });
});
