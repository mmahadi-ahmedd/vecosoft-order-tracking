import { describe, expect, it } from 'vitest'
import { DEMO_NOW, mockOrders } from '../data/mockOrders'
import type { ScenarioId } from '../types/order'
import { deriveTrackingView } from './deriveTrackingView'

const view = (id: ScenarioId) => deriveTrackingView(mockOrders[id], DEMO_NOW)
const states = (id: ScenarioId) => view(id).steps.map((s) => s.state)

describe('deriveTrackingView', () => {
  it('detects each scenario', () => {
    expect(view('on-track').kind).toBe('on-track')
    expect(view('delayed').kind).toBe('delayed')
    expect(view('delivered-not-received').kind).toBe('delivered-not-received')
    expect(view('tracking-pending').kind).toBe('tracking-pending')
  })

  it('marks progress correctly for an on-track order', () => {
    expect(states('on-track')).toEqual(['done', 'done', 'done', 'current', 'upcoming'])
    expect(view('on-track').tone).toBe('brand')
  })

  it('flags the current step and offers support when delayed', () => {
    const v = view('delayed')
    expect(v.tone).toBe('warn')
    expect(v.steps.find((s) => s.state === 'current')?.warning).toBe(true)
    expect(v.primaryAction.id).toBe('contact-support')
    expect(v.banner).toBeDefined()
  })

  it('is not delayed before the estimate has passed', () => {
    const early = new Date('2026-09-25T12:00:00+06:00')
    expect(deriveTrackingView(mockOrders.delayed, early).kind).toBe('on-track')
  })

  it('handles delivered-but-not-received', () => {
    const v = view('delivered-not-received')
    expect(v.tone).toBe('danger')
    expect(states('delivered-not-received').every((s) => s === 'done')).toBe(true)
    expect(v.steps.at(-1)?.warning).toBe(true)
    expect(v.banner?.message).toContain('SUP-58213')
  })

  it('never renders an empty screen when tracking is missing', () => {
    const v = view('tracking-pending')
    expect(v.tone).toBe('neutral')
    expect(v.primaryAction.id).toBe('notify-me')
    expect(v.eta.value).not.toBe('')
    expect(v.steps).toHaveLength(5)
  })
})