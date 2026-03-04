import { createClient } from '@/lib/supabase/server'

export async function getScenarios() {
  const supabase = await createClient()
  
  const { data: scenarios, error } = await supabase
    .from('scenarios')
    .select(`
      *,
      scenario_skills (*)
    `)
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching scenarios:', error)
    return []
  }

  return scenarios || []
}

export async function getScenarioById(id: string) {
  const supabase = await createClient()
  
  const { data: scenario, error } = await supabase
    .from('scenarios')
    .select(`
      *,
      scenario_skills (*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching scenario:', error)
    return null
  }

  return scenario
}