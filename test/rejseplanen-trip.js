'use strict'

const tap = require('tap')

const createClient = require('..')
const rawProfile = require('../p/rejseplanen')
const res = require('./fixtures/rejseplanen-trip.json')
const expected = require('./fixtures/rejseplanen-trip.js')

const client = createClient(rawProfile, 'public-transport/hafas-client:test')
const {profile} = client

const opt = {
	stopovers: true,
	polyline: true,
	subStops: false,
	entrances: true,
	remarks: true,
	when: '2021-11-12T17:30:00+02:00',
}

tap.test('parses a trip correctly (Rejseplanen)', (t) => {
	const common = profile.parseCommon({profile, opt, res})
	const ctx = {profile, opt, common, res}
	const trip = profile.parseTrip(ctx, res.journey)

	t.same(trip, expected)
	t.end()
})
