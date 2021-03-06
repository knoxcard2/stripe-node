'use strict';

const stripe = require('../../testUtils').getSpyableStripe();
const expect = require('chai').expect;

describe('BitcoinReceivers Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      stripe.bitcoinReceivers.retrieve('receiverId1');
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/bitcoin/receivers/receiverId1',
        headers: {},
        data: {},
        settings: {},
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      stripe.bitcoinReceivers.list();
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/bitcoin/receivers',
        headers: {},
        data: {},
        settings: {},
      });
    });
  });

  describe('listTransactions', () => {
    it('Sends the correct request', () => {
      stripe.bitcoinReceivers.listTransactions('receiverId', {
        limit: 1,
      });
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/bitcoin/receivers/receiverId/transactions?limit=1',
        headers: {},
        data: {},
        settings: {},
      });
    });
  });
});
