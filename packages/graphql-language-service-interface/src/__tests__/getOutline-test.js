import {expect} from 'chai';
import {describe, it} from 'mocha';
import {getOutline} from '../getOutline';

describe('getOutline', () => {
  it('gets outline trees correctly', () => {
    const query = `query test {
      name
    }`;
    expect(getOutline(query).outlineTrees).to.not.be.undefined;
    expect(getOutline(query).outlineTrees.length).to.equal(1);
    expect(getOutline(query).outlineTrees[0].startPosition.line).to.equal(0);
    expect(getOutline(query).outlineTrees[0].startPosition.character).to.equal(
      0,
    );
    expect(getOutline(query).outlineTrees[0].endPosition.line).to.equal(2);
    expect(getOutline(query).outlineTrees[0].endPosition.character).to.equal(5);
    expect(getOutline(query).outlineTrees[0].representativeName).to.equal(
      'test',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText.length).to.equal(3);
    expect(getOutline(query).outlineTrees[0].tokenizedText[0].kind).to.equal(
      'keyword',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText[0].value).to.equal(
      'query',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText[1].kind).to.equal(
      'whitespace',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText[1].value).to.equal(
      ' ',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText[2].kind).to.equal(
      'class-name',
    );
    expect(getOutline(query).outlineTrees[0].tokenizedText[2].value).to.equal(
      'test',
    );

    expect(getOutline(query).outlineTrees[0].children.length).to.equal(1);
    expect(
      getOutline(query).outlineTrees[0].children[0].children.length,
    ).to.equal(0);
    expect(
      getOutline(query).outlineTrees[0].children[0].startPosition.line,
    ).to.equal(1);
    expect(
      getOutline(query).outlineTrees[0].children[0].startPosition.character,
    ).to.equal(6);
    expect(
      getOutline(query).outlineTrees[0].children[0].endPosition.line,
    ).to.equal(1);
    expect(
      getOutline(query).outlineTrees[0].children[0].endPosition.character,
    ).to.equal(10);
    expect(
      getOutline(query).outlineTrees[0].children[0].representativeName,
    ).to.equal('name');
    expect(
      getOutline(query).outlineTrees[0].children[0].tokenizedText.length,
    ).to.equal(1);
    expect(
      getOutline(query).outlineTrees[0].children[0].tokenizedText[0].kind,
    ).to.equal('plain');
    expect(
      getOutline(query).outlineTrees[0].children[0].tokenizedText[0].value,
    ).to.equal('name');
  });
});
