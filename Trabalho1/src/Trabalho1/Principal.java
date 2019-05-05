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
public class Principal {

    static void chamarConta1() {
        ContaComumCad janela1 = new ContaComumCad();
        janela1.setVisible(true);
    }

    public static void chamarConta2() {
        ContaPoupancaCad janela2 = new ContaPoupancaCad();
        janela2.setVisible(true);
    }

    public static void chamarConta3() {
        ContaEspecialCad janela3 = new ContaEspecialCad();
        janela3.setVisible(true);
    }

    public static void chamarOperacoes() {
        Operacoes janela = new Operacoes();
        janela.setVisible(true);
    }

    public static Contas conta1 = new Contas();
    public static ContaPoupanca conta2 = new ContaPoupanca();
    public static ContaEspecial conta3 = new ContaEspecial();

    public static void main(String[] args) {

        JOptionPane.showMessageDialog(null, "Bem Vindo!");
        chamarConta1();
    }

}
