/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Trabalho1;

import javax.swing.JOptionPane;

/**
 *
 * @author João Victor
 */
public class ContaEspecial extends Contas {

    int limite;
    double multa;
    double percente;

    Contas c = new Contas();

    public double getMulta() {
        return multa;
    }

    public void setMulta(double multa) {
        this.multa = multa;
    }

    public int getLimite() {
        return limite;
    }

    public void setLimite(int limite) {
        this.limite = limite;
    }

    public void descontar(double multa) {
        percente = (limite - getSaldo()) * multa / 100;
        setSaldo(getSaldo() - percente);
    }

    public void tipoConta3() {
        JOptionPane.showMessageDialog(null, "Tipo da conta: Conta especial");
    }
}
